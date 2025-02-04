/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className={`w-full py-3 ${
            job?.isOpen && !applied
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-gray-900 text-white border border-gray-700 rounded-lg">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Please fill out the form below
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-6"
        >
          <Input
            type="number"
            placeholder="Years of Experience"
            className="bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-600"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-400 text-sm">{errors.experience.message}</p>
          )}

          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-600"
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-400 text-sm">{errors.skills.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded-md">
                      Intermediate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="graduate" className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded-md">
                      Graduate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <Label htmlFor="post-graduate" className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded-md">
                      Post Graduate
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-400 text-sm">{errors.education.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="bg-gray-800 text-white border border-gray-700"
            {...register("resume")}
          />
          {errors.resume && (
            <p className="text-red-400 text-sm">{errors.resume.message}</p>
          )}

          {errorApply?.message && (
            <p className="text-red-400 text-sm">{errorApply?.message}</p>
          )}

          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}

          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full py-3">
            Submit Application
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

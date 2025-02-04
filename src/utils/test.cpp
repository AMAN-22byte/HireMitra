#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

bool comp(pair<ll,ll>&a, pair<ll,ll>&b){
    return a.first>b.first;
}

ll main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    ll n;
    cin>>n;
    ll q;
    cin>>q;
    vector<ll>p(n);
    for(ll i=0;i<n;i++){
        cin>>p[i];
    }
    sort(p.begin(),p.end(),greater<ll>());
    vector<pair<ll,ll>>m;
    while(q--){
        ll l,r;
        cin>>l>>r;
        m.push_back({l,r});
    }
    vector<ll>hash(n+1,0);
    for(ll i=0;i<m.size();i++){
        hash[m[i].first-1]+=1;
        if(m[i].second<n){
            hash[m[i].second]+=-1;
        }
    }
    vector<ll>presum(n,0);
    presum[0]=hash[0];
    for(ll i=1;i<n;i++){
        presum[i]=presum[i-1]+hash[i];
    }
    // ll maxi=*max_element()
    vector<pair<ll,ll>>f;
    for(ll i=0;i<presum.size();i++){
        f.push_back({presum[i],i});
    }
    sort(f.begin(),f.end(),comp);
    vector<ll>k(n,0);
    for(ll i=0;i<n;i++){
        k[f[i].second]=p[i];
    }
    vector<ll>sum(n);
    sum[0]=k[0];
    for(ll i=1;i<n;i++){
        sum[i]=sum[i-1]+k[i];
    }
    ll res=0;
    for(ll i=0;i<m.size();i++){
        if(m[i].first-1>0){
            res+=sum[m[i].second-1]-sum[m[i].first-1-1];
        }
        else{
            res+=sum[m[i].second-1];
        }
    }
    cout<<res<<endl;
}
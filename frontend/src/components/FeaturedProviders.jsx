const providers = [
  {
    name: "Ramesh Kumar",
    profession: "Carpenter",
    location: "Noida",
    price: "₹500/Visit"
  },
  {
    name: "Priya Sharma",
    profession: "Home Tutor",
    location: "Delhi",
    price: "₹400/hr"
  },
  {
    name: "Amit Verma",
    profession: "Electrician",
    location: "Ghaziabad",
    price: "₹300/Visit"
  }
];

function FeaturedProviders(){

return(

<section className="max-w-6xl mx-auto py-20">


<h2 className="text-3xl font-bold mb-10 text-center">

Top Service Providers   

</h2>



<div className="grid md:grid-cols-3 gap-6">


{providers.map((provider,index)=>(


<div

key={index}

className="bg-white shadow-md rounded-xl p-6"

>


<div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto">


{provider.name[0]}


</div>



<h3 className="text-center mt-4 font-semibold">


{provider.name}


</h3>



<p className="text-center text-gray-500">


{provider.profession} - {provider.location} 


</p>



</div>



))}



</div>


</section>

)

}


export default FeaturedProviders;
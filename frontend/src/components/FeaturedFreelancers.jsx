const freelancers=[

{
name:"Nitin Sharma",
skill:"Full Stack Developer"
},

{
name:"Rahul Verma",
skill:"Graphic Designer"
},

{
name:"Priya Singh",
skill:"AI Engineer"
}

];


function FeaturedFreelancers(){

return(

<section className="max-w-6xl mx-auto py-20">


<h2 className="text-3xl font-bold mb-10 text-center">

Top Freelancers

</h2>



<div className="grid md:grid-cols-3 gap-6">


{freelancers.map((user,index)=>(


<div

key={index}

className="bg-white shadow-md rounded-xl p-6"

>


<div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto">


{user.name[0]}


</div>



<h3 className="text-center mt-4 font-semibold">


{user.name}


</h3>



<p className="text-center text-gray-500">


{user.skill}


</p>



</div>



))}



</div>


</section>

)

}


export default FeaturedFreelancers
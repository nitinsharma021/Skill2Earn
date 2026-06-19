const categories = [

"Web Development",
"AI & ML",
"Graphic Design",
"Content Writing",
"Video Editing",
"Digital Marketing"

];

function Categories() {

return (

<section className="max-w-6xl mx-auto py-20">

<h2 className="text-3xl font-bold mb-10 text-center">

Popular Categories

</h2>


<div className="grid md:grid-cols-3 gap-6">

{categories.map((cat,index)=>(

<div
key={index}
className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-xl duration-300"
>

<h3 className="text-xl font-semibold">

{cat}

</h3>

</div>

))}

</div>


</section>

)

}

export default Categories
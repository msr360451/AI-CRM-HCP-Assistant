export default function RadioGroup({
    value="",
    onChange=()=>{}
}){

const options=["Positive","Neutral","Negative"]

return(

<div>

<label className="block text-sm font-medium mb-2">

Observed / Inferred HCP Sentiment

</label>

<div className="flex gap-8">

{

options.map((item)=>(

<label
key={item}
className="flex items-center gap-2 cursor-pointer"
>

<input

type="radio"

checked={value===item}

onChange={()=>onChange(item)}

/>

{item}

</label>

))

}

</div>

</div>

)

}
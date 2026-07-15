import { useDispatch, useSelector } from "react-redux";
import FormInput from "./FormInput";
import RadioGroup from "./RadioGroup";
import {
  updateInteraction,
  updateField,
} from "../redux/interactionSlice";

export default function InteractionForm(){

const dispatch=useDispatch();

const data=useSelector(
state=>state.interaction
);

const change=(field)=>(e)=>{

dispatch(

updateField({

field,

value:e.target.value

})

);

};

return(

<div className="bg-white rounded-2xl border shadow-lg h-full p-8 overflow-y-auto">

<h2 className="text-xl font-semibold mb-6">

Interaction Details

</h2>

<div className="grid grid-cols-2 gap-5">

<FormInput

label="HCP Name"

placeholder="Search HCP"

value={data.hcpName}

onChange={change("hcpName")}

/>

<div>

<label className="block text-sm mb-1">

Interaction Type

</label>

<select

value={data.interactionType}

onChange={change("interactionType")}

className="w-full border rounded-lg px-3 py-2"

>

<option>In Person</option>

<option>Phone</option>

<option>Video Call</option>

</select>

</div>

<FormInput

label="Date"

type="date"

value={data.date}

onChange={change("date")}

/>

<FormInput

label="Time"

type="time"

value={data.time}

onChange={change("time")}

/>

</div>

<div className="mt-5">

<FormInput

label="Attendees"

placeholder="Attendees"

value={data.attendees}

onChange={change("attendees")}

/>

</div>

<div className="mt-5">

<label className="block text-sm mb-1">

Topics Discussed

</label>

<textarea

rows={4}

value={data.topics}

onChange={change("topics")}

className="w-full border rounded-lg p-3"

/>

</div>

<div className="mt-5">

<RadioGroup

value={data.sentiment}

onChange={(value)=>dispatch(

updateField({

field:"sentiment",

value

})

)}

 />

</div>

<div className="mt-5">

<label className="block text-sm mb-1">

Outcomes

</label>

<textarea

rows={3}

value={data.outcomes}

onChange={change("outcomes")}

className="w-full border rounded-lg p-3"

/>

</div>

<div className="mt-5">

<label className="block text-sm mb-1">

Follow-up Actions

</label>

<textarea

rows={3}

value={data.followUp}

onChange={change("followUp")}

className="w-full border rounded-lg p-3"

/>

</div>
<div className="mt-5 flex gap-8">

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={data.materialsShared}
      onChange={(e) =>
        dispatch(
          updateField({
            field: "materialsShared",
            value: e.target.checked,
          })
        )
      }
    />
    Materials Shared
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={data.samplesDistributed}
      onChange={(e) =>
        dispatch(
          updateField({
            field: "samplesDistributed",
            value: e.target.checked,
          })
        )
      }
    />
    Samples Distributed
  </label>

</div>

</div>

);

}
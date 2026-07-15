export default function MessageBubble({
    sender,
    message
}){

const isUser=sender==="user";

return(

<div
className={`flex mb-4 ${
isUser ? "justify-end":"justify-start"
}`}
>

<div

className={`max-w-xs rounded-xl px-4 py-3 text-sm

${

isUser

?

"bg-blue-600 text-white"

:

"bg-gray-100 text-gray-700"

}

`}

>

{message}

</div>

</div>

)

}
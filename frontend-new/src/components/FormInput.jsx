export default function FormInput({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange = () => {},
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-600 mb-1">

        {label}

      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}
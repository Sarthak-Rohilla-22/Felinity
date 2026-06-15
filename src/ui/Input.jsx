function Input({ value, onChange, type }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="
                w-full
                rounded-lg
                border border-taupe-300
                px-4 py-3
                outline-none
                transition
                focus:border-taupe-500
                focus:ring-2
                focus:ring-taupe-200
              "
      required
    />
  );
}

export default Input;

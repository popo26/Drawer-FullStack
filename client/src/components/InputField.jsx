import "../css/InputField.css";


export default function InputField({
  htmlFor,
  type,
  name,
  id,
  placeholder,
  value,
  handleNewDrawerChange,
}) {
  const handleChange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    // Change the name - handleNewDrawerChange
    handleNewDrawerChange(value);
  };

  return (
    <div className="InputField-main-div">
      <label className="form-label" htmlFor={htmlFor}>{placeholder}:</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  );
}

import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  //first we check if a label exists with &&, if truesy then render label
  //className for label is just a conditional operator so...
  //if otherProps.value exists then we give className shrink
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length > 0 ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

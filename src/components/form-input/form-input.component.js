import {
  shrinkLabelStyles,
  FormInputLabel,
  Input,
  Group,
} from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  //first we check if a label exists with &&, if truesy then render label
  //className for label is just a conditional operator so...
  //if otherProps.value exists then we give className shrink
  return (
    <Group className="group">
      <Input className="form-input" {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;

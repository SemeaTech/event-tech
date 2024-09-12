import { FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, Ref, forwardRef } from "react";
import { Input } from "./ui/input";

interface IFormRootProps extends FormHTMLAttributes<HTMLFormElement> {}

function Root(props: IFormRootProps) {
  return (
    <form
      { ...props }
    >
      { props.children }
    </form>
  )
}

interface IFormTriggerProps {
  children: ReactNode;
  className?: string;
}

//action buttons
function Trigger({ children, className }: IFormTriggerProps) {
  return (
    <section className={ className }>
      { children }
    </section>
  )
}

interface IFormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

function Label(props: IFormLabelProps){
  return (
    <label { ...props }>
      { props.children }
    </label>
  )
}

interface IFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

function InputCustom(props: IFormFieldProps, ref: Ref<HTMLInputElement>) {
  return (
    <Input { ...props } ref={ref}/>
  )
}
const InputField = forwardRef(InputCustom)

export const Form = { Root, Trigger, Label, Field: InputField }

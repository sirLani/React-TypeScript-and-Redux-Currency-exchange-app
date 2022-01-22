export interface iFormBaseProps {
   // children?: undefined;
}

export interface iInputProps {
   rightComponent?: React.ReactElement;
   leftComponent?: React.ReactElement;
   placeholder?: string;
   label?: string;
   onChange?: (event: any) => void;
   width?: number;
   error?: string;
   textAlign?: string;
   type?: string;
   value?: string;
   name?: string;
}

export interface iInputGroupProp {
   width?: number;
}

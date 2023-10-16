import { Checkbox } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const EditableCheckbox = ({ isEditing, checked }) => {

  if(isEditing) {
    return (<Checkbox sx={{p: 0}} checked={checked} />);
  }

  return checked ? (<CheckIcon/>) : (<></>);
}
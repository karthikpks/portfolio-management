import React from 'react';
import { Button } from '@material-ui/core';

interface ButtonFieldProps {
    name: string;
    type: 'submit' | 'reset' | 'button' | undefined;
    onClick?: () => void;
    style?: string;
};

const CustomButton = (props: ButtonFieldProps) => {

    return (
        <Button
            type={props.type}
            fullWidth
            variant="contained"
            color="primary"
            className={props.style}
            onClick={props.onClick}
          >
            {props.name}
          </Button>
    );
}
export default CustomButton;
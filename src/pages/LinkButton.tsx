import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
    label: string,
    href: string,
    variant: string
}

const LinkButton: React.FC<Props> = ({ label = "Button", href = "/", variant = "primary" }) => {
    const navigate = useNavigate();
    const navigateTo = (event:any) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(href);
    }
    return (
        <Button type="button" size="sm" variant={variant} onClick={navigateTo}>{label}</Button>
    );
};
 
export default LinkButton;
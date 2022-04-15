import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { cn } from '../contexts/cn';
import { useWhyDidYou } from '../hooks/useWhyDidYou';

export type IconButtonProps = {
    icon: IconDefinition;
    bg?: string;
    text?: string;
    border?: string;
    shadow?: string;
    size?: SizeProp;
} & Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;

export type ButtonProps = {
    bg?: string;
    text?: string;
    border?: string;
    shadow?: string;
    children?: Children;
} & Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
export function Button(props: ButtonProps) {
    useWhyDidYou('Button', props);
    const { bg, text, shadow, border, ...remain } = props;
    const newProps = cn(
        remain,
        {},
        'transition duration-1000 ease-in-out delay-150 transform hover:shadow-red focus:scale-105 hover:bg-amber focus:outline-2 focus:outline-yellow',
        bg ?? 'bg-black',
        text ?? 'text-white',
        border ?? 'border-2 border-cyan rounded-lg',
        shadow ?? 'shadow-lg shadow-gray'
    );
    return (
        <button
            type='button'
            {...newProps}
        ></button>
    );
}
export function IconButton(props: IconButtonProps) {
    useWhyDidYou('IconButton', props);
    const { bg, text, shadow, border, icon, size, ...remain } = props;
    const newProps = cn(
        remain,
        {},
        'transition duration-1000 ease-in-out delay-150 transform hover:shadow-red focus:scale-105 hover:bg-amber focus:outline-2 focus:outline-yellow',
        bg ?? 'bg-black',
        text ?? 'text-white',
        border ?? 'border-2 border-cyan rounded-lg',
        shadow ?? 'shadow-lg shadow-gray'
    );
    return (
        <button
            type='button'
            {...newProps}
        >
            <FontAwesomeIcon
                className='m-1'
                icon={icon}
                size={size}
            />
        </button>
    );
}
export function IconLinkButton(
    props: {
        bg?: string;
        text?: string;
        border?: string;
        shadow?: string;
        children?: Children;
        icon: IconDefinition;
        size?: SizeProp;
    } & Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> & { to: string }
) {
    useWhyDidYou('IconLinkButton', props);
    const { bg, text, shadow, border, icon, size, ...remain } = props;
    const { to, ...newProps } = cn(
        remain,
        {},
        'transition duration-1000 ease-in-out delay-150 transform hover:shadow-red focus:scale-105 hover:bg-amber focus:outline-2 focus:outline-yellow',
        bg ?? 'bg-black',
        text ?? 'text-white',
        border ?? 'border-2 border-cyan rounded-lg',
        shadow ?? 'shadow-lg shadow-gray'
    );
    return (
        <Link
            {...newProps}
            to={to}
        >
            <FontAwesomeIcon
                className='m-1'
                icon={icon}
                size={size}
            />
        </Link>
    );
}

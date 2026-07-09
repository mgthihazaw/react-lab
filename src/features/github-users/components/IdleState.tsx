type IdleStateProps = { 
    message: string;
};

export function IdleState({ message }: IdleStateProps) {
    return <p className="github-users__empty">{message}</p>;
}
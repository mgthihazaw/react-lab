type LoadingStateProps = { 
    message: string;
};

export function LoadingState({ message }: LoadingStateProps) {
    return <p className="github-users__empty">{message}</p>;
}
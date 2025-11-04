type PropsType = {
    children: string
}

function Divider({ children }: PropsType) {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-black px-4 text-gray-600 dark:text-gray-400">{children}</span>
            </div>
        </div>
    );
}

export default Divider;

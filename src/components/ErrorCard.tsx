import React from 'react'

function ErrorCard({ errorMessage }: { errorMessage: string }) {
    return (
        <div className="p-4 mb-4 text-sm text-red-600 rounded-base bg-red-200" role="alert">
            <span className="font-medium">Error!</span> {errorMessage}
        </div>
    )
}

export default ErrorCard

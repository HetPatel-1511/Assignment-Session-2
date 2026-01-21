import React from 'react'

const StatsCard = React.memo(({
    title,
    body
}:{
    title: string,
    body: string,
}) => {
    return (
        <div className="bg-gray-700 block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium rounded">
            <h5 className="mb-3 text-3xl text-white text-center font-semibold tracking-tight text-heading leading-8">
                {title}
            </h5>
            <p className="text-4xl text-center text-gray-100">
                {body}
            </p>
        </div>
    )
})

export default StatsCard

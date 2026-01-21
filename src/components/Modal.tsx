import React, { type JSX, type MouseEventHandler } from 'react'

const Modal = ({
    showModal,
    onCloseModal,
    onSubmit,
    submitButtonText,
    heading,
    body
}:{
    showModal: boolean,
    onCloseModal: MouseEventHandler<HTMLButtonElement>,
    onSubmit: MouseEventHandler<HTMLButtonElement>,
    submitButtonText: string,
    heading: string,
    body: JSX.Element
}) => {
    return (
        <div
            id="default-modal"
            tabIndex={1}
            aria-hidden="true"
            className={`${showModal ? "" : "hidden "} bg-transparent backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}
        >
            <div className="relative top-2 m-auto p-4 w-full max-w-2xl max-h-full bg-gray-100 rounded">
                <div className="relative rounded bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading">{heading}</h3>
                        <button
                            type="button"
                            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto cursor-pointer inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                            onClick={onCloseModal}
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                        {body}
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                        <button
                            type="submit"
                            className="text-white bg-gray-800 box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer rounded"
                            onClick={onSubmit}
                        >
                            {submitButtonText}
                        </button>
                        <button
                            data-modal-hide="default-modal"
                            type="button"
                            className="text-body rounded bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium cursor-pointer leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                            onClick={onCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal

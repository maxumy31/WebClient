import { useRef } from "react"
import { nanoid } from "nanoid"

export default function AddContactModal({
    onClose,
    onEmailInput,
    onPhoneInput,
    onNameInput,
    onSubmit,
    errorMessage,
}) {

    const formRef = useRef(null)

    const nameInput = useRef(null)
    const emailInput = useRef(null)
    const phoneInput = useRef(null)

    function takeInputFromForm() {
        const form = formRef.current
        if (!form) return

        if (form.checkValidity()) {
            return {
                name: nameInput.current.value,
                email: emailInput.current.value,
                phone: phoneInput.current.value
            }
        }

        return null
    }

    console.log(errorMessage)
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <form
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(takeInputFromForm());
                }}

                className="bg-white rounded-xl shadow-xl w-[420px] p-6 flex flex-col gap-4"
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Добавить контакт</h3>
                    {errorMessage && <h3 className="text-md">{errorMessage}</h3>}
                </div>

                <div className="flex flex-col gap-3">
                    <input
                        id="name-input"
                        type="text"
                        placeholder="Имя"
                        ref={nameInput}
                        required
                        onChange={(input) => onNameInput(input)}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        id="email-input"
                        type="text"
                        placeholder="email@example.com"
                        ref={emailInput}
                        required
                        onChange={(input) => onEmailInput(input)}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        id="phone-input"
                        type="tel"
                        placeholder="+79999999999"
                        ref={phoneInput}
                        required
                        onChange={(input) => onPhoneInput(input)}
                        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => { onClose(); }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Отмена
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    )
}
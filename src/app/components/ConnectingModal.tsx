import React from 'react';

type Props = {
    isOpen: boolean;
    onCancel: () => void;
}

export function ConnectingModal({ isOpen, onCancel }: Props) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative bg-white rounded-lg shadow-xl p-8 w-80">
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                    aria-label="Cancelar conexão"
                >
                    &times;
                </button>
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-gray-900 mt-2">
                        Conectando...
                    </h3>
                    <p className="text-sm text-gray-600">
                        Aguarde um momento.
                    </p>
                </div>
            </div>
        </div>
    );
}

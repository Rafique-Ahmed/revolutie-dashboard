// src/pages/roles/DeleteRoleDialog.tsx
import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  roleName: string;
  userCount?: number;
}

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  roleName,
  userCount = 0,
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleConfirm = async () => {
    if (confirmText !== roleName) {
      return;
    }
    setLoading(true);
    await onConfirm();
    setLoading(false);
    setConfirmText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
            Delete Role
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
            Are you sure you want to delete the role{' '}
            <span className="font-medium text-gray-900 dark:text-white">"{roleName}"</span>?
          </p>

          {userCount > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ This role is currently assigned to <strong>{userCount}</strong> user
                {userCount > 1 ? 's' : ''}. Deleting it will remove their permissions.
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type <span className="font-bold text-red-600 dark:text-red-400">{roleName}</span> to
              confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder={`Type "${roleName}"`}
              autoFocus
            />
          </div>

          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || confirmText !== roleName}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </div>
              ) : (
                'Delete Role'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleDialog;

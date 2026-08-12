import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { Permission } from '../../../api/roles';

interface PermissionsGroupProps {
  permissions: Permission[];
  selectedPermissions: number[];
  onToggle: (permissionId: number) => void;
  onToggleAll: (permissionIds: number[], checked: boolean) => void;
}

const PermissionsGroup: React.FC<PermissionsGroupProps> = ({
  permissions,
  selectedPermissions,
  onToggle,
  onToggleAll,
}) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Group permissions by module
  const groupedPermissions = permissions.reduce(
    (acc, perm) => {
      const module = perm.module || 'General';
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(perm);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  const toggleModule = (module: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const isAllSelected = (perms: Permission[]) =>
    perms.every((p) => selectedPermissions.includes(p.id));

  const isSomeSelected = (perms: Permission[]) =>
    perms.some((p) => selectedPermissions.includes(p.id));

  const getModuleIcon = (module: string) => {
    const icons: Record<string, string> = {
      users: '👥',
      roles: '🔐',
      settings: '⚙️',
      dashboard: '📊',
      analytics: '📈',
      system: '🖥️',
      General: '📋',
    };
    return icons[module.toLowerCase()] || '📌';
  };

  return (
    <div className="space-y-3">
      {Object.entries(groupedPermissions).map(([module, perms]) => {
        const isExpanded = expandedModules[module] !== false;
        const allSelected = isAllSelected(perms);
        const someSelected = isSomeSelected(perms);

        return (
          <div
            key={module}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
          >
            {/* Module Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <button
                onClick={() => toggleModule(module)}
                className="flex items-center space-x-3 flex-1"
              >
                <span className="text-lg">{getModuleIcon(module)}</span>
                <span className="font-medium text-gray-900 dark:text-white">{module}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({perms.length} permissions)
                </span>
              </button>

              <div className="flex items-center space-x-3">
                {/* Select All Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleAll(
                      perms.map((p) => p.id),
                      !allSelected
                    );
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    allSelected
                      ? 'bg-[#4880FF] border-[#4880FF]'
                      : someSelected
                        ? 'bg-blue-200 border-blue-400 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  {(allSelected || someSelected) && <Check className="w-3 h-3 text-white" />}
                </button>

                <button
                  onClick={() => toggleModule(module)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Permissions List */}
            {isExpanded && (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {perms.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm.id)}
                      onChange={() => onToggle(perm.id)}
                      className="mt-1 w-4 h-4 text-[#4880FF] border-gray-300 rounded focus:ring-[#4880FF] dark:border-gray-600 dark:bg-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {perm.name.replace(/_/g, ' ').toUpperCase()}
                      </p>
                      {perm.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {perm.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PermissionsGroup;

// src/services/role.service.ts
import { rolesApi, Role, CreateRoleData, Permission } from '../api/roles';
import toast from 'react-hot-toast';
import { debug } from '../lib/debug';

export class RoleService {
  async getRoles(params?: { page?: number; per_page?: number; search?: string }) {
    try {
      debug.log('📡 RoleService.getRoles called with params:', params);

      const response = await rolesApi.getRoles(params);

      debug.log('📦 RoleService.getRoles - Raw response:', response);

      let rolesData = [];

      if (response.data && Array.isArray(response.data)) {
        debug.log('✅ Case 1: response.data is array');
        rolesData = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        debug.log('✅ Case 2: response.data.data is array');
        rolesData = response.data.data;
      } else if (Array.isArray(response)) {
        debug.log('✅ Case 3: response is array');
        rolesData = response;
      } else {
        debug.log('🔍 Searching for array in response...');
        for (const key in response) {
          if (Array.isArray(response[key])) {
            debug.log(`✅ Found array at key: ${key}`);
            rolesData = response[key];
            break;
          }
        }
      }

      debug.log('✅ Final roles data:', rolesData);
      debug.log('✅ Roles count:', rolesData.length);

      return {
        data: rolesData,
        meta: response.meta || response.data?.meta || {},
        links: response.links || response.data?.links || {},
      };
    } catch (error: unknown) {
      debug.error('❌ RoleService.getRoles Error:', error);

      let message = 'Failed to fetch roles';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = (error as Error).message;
      }

      toast.error(message);
      throw error;
    }
  }

  async getRole(id: number): Promise<Role> {
    try {
      debug.log(`📡 RoleService.getRole called with id: ${id}`);
      const role = await rolesApi.getRole(id);
      debug.log(`✅ RoleService.getRole response:`, role);
      return role;
    } catch (error: unknown) {
      debug.error(`❌ RoleService.getRole Error for id ${id}:`, error);

      let message = 'Failed to fetch role';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }

  async createRole(data: CreateRoleData): Promise<Role> {
    try {
      debug.log('📡 RoleService.createRole called with data:', data);
      const role = await rolesApi.createRole(data);
      debug.log('✅ RoleService.createRole response:', role);
      toast.success('Role created successfully!');
      return role;
    } catch (error: unknown) {
      debug.error('❌ RoleService.createRole Error:', error);

      let message = 'Failed to create role';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }

  async updateRole(id: number, data: Partial<CreateRoleData>): Promise<Role> {
    try {
      debug.log(`📡 RoleService.updateRole called for id ${id} with data:`, data);
      const role = await rolesApi.updateRole(id, data);
      debug.log(`✅ RoleService.updateRole response:`, role);
      toast.success('Role updated successfully!');
      return role;
    } catch (error: unknown) {
      debug.error(`❌ RoleService.updateRole Error for id ${id}:`, error);

      let message = 'Failed to update role';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }

  async deleteRole(id: number): Promise<void> {
    try {
      debug.log(`📡 RoleService.deleteRole called for id: ${id}`);
      await rolesApi.deleteRole(id);
      debug.log(`✅ RoleService.deleteRole success for id ${id}`);
      toast.success('Role deleted successfully!');
    } catch (error: unknown) {
      debug.error(`❌ RoleService.deleteRole Error for id ${id}:`, error);

      let message = 'Failed to delete role';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }

  async getPermissions(): Promise<Permission[]> {
    try {
      debug.log('📡 RoleService.getPermissions called');
      const permissions = await rolesApi.getPermissions();
      debug.log('✅ RoleService.getPermissions response:', permissions);
      return permissions;
    } catch (error: unknown) {
      debug.error('❌ RoleService.getPermissions Error:', error);

      let message = 'Failed to fetch permissions';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }

  async getRolePermissions(id: number): Promise<Permission[]> {
    try {
      debug.log(`📡 RoleService.getRolePermissions called for id: ${id}`);
      const permissions = await rolesApi.getRolePermissions(id);
      debug.log(`✅ RoleService.getRolePermissions response:`, permissions);
      return permissions;
    } catch (error: unknown) {
      debug.error(`❌ RoleService.getRolePermissions Error for id ${id}:`, error);

      let message = 'Failed to fetch role permissions';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }

  async updateRolePermissions(id: number, permissionIds: number[]): Promise<void> {
    try {
      debug.log(`📡 RoleService.updateRolePermissions called for id ${id}:`, permissionIds);
      await rolesApi.updateRolePermissions(id, permissionIds);
      debug.log(`✅ RoleService.updateRolePermissions success for id ${id}`);
      toast.success('Permissions updated successfully!');
    } catch (error: unknown) {
      debug.error(`❌ RoleService.updateRolePermissions Error for id ${id}:`, error);

      let message = 'Failed to update permissions';
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        if (err.response?.data?.message) {
          message = err.response.data.message;
        }
      }

      toast.error(message);
      throw error;
    }
  }
}

// ✅ Make sure this export exists at the bottom
export const roleService = new RoleService();
// Also export as default for flexibility
export default roleService;

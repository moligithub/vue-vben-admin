import { ref } from 'vue';
import { useAuthStore } from '#/store/auth';

export function useLogin() {
  const authStore = useAuthStore();
  const loading = ref(false);

  const login = async (params: any) => {
    try {
      loading.value = true;
      await authStore.authLogin(params);
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    login,
    loading,
  };
}

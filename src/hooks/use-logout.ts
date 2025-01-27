import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, logout',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');

        navigate('/login');
        toast.success('Logout successful!');
      }
    });
  };

  return logout;
}

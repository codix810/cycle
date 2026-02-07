"use client";

export default function LogoutButton() {
  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return (
    <button
      onClick={logout}
      className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-100"
    >
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      تسجيل الخروج
    </button>
  );
}

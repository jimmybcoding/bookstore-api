import LoginForm from "../ui components/loginForm";
import AddUserForm from "../ui components/addUserForm";
import Navbar from "../ui components/navbar";
import Footer from "../ui components/footer";

function Login() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 text-mint">Welcome</h1>
      <p className="mb-8 text-mint">Sign in or create an account below.</p>

      <LoginForm />
      <div className="mt-10 border-t border-mint w-1/2"></div>
      <h2 className="mt-8 text-xl font-semibold text-mint">New Account?</h2>
      <AddUserForm />
      <Footer />
    </div>
  );
}

export default Login;

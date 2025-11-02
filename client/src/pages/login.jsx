/* import LoginForm from "../ui components/loginForm";
import AddUserForm from "../ui components/addUserForm";
import Navbar from "../ui components/navbar";
import Footer from "../ui components/footer";

function Login() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex flex-col w-1/2 mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-mint">Welcome</h1>
        <p className="mb-8 text-mint">Sign in or create an account below.</p>

        <LoginForm />
        <div className="mt-10 border-t border-mint w-1/2"></div>
        <h2 className="mt-8 text-xl font-semibold text-mint">New Account?</h2>
        <AddUserForm />
      </main>
      <Footer />
    </div>
  );
}

export default Login; */
import LoginForm from "../ui-components/loginForm";
import AddUserForm from "../ui-components/addUserForm";
import Navbar from "../ui-components/navbar";
import Footer from "../ui-components/footer";

function Login() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Login Section */}
          <div>
            <h1 className="text-3xl font-bold text-center text-mint mb-2">Welcome Back</h1>
            <p className="text-center text-purple-500 mb-6">Sign in to your account</p>
            <LoginForm />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-purple-500">Or</span>
            </div>
          </div>

          {/* Sign Up Section */}
          <div>
            <h2 className="text-2xl font-semibold text-center text-mint mb-2">New to SpiceShelf?</h2>
            <p className="text-center text-purple-500 mb-6">Create your account</p>
            <AddUserForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
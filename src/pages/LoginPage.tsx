const LoginPage = () => {
  return (
    <div className="mx-12">
      <h1>Hello, From LoginPage!</h1>
      <form action="" className="flex flex-col gap-4 w-40">
        <input
          className="border bg-gray-50 p-2 rounded-md "
          type="text"
          placeholder="Email"
        />
        <input
          className="border bg-gray-50 p-2 rounded-md "
          type="text"
          placeholder="Password"
        />
        <button className="p-2 bg-custom-blue text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

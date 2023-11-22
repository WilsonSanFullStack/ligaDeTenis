import { auth, currentUser } from "@clerk/nextjs";

async function loadPOsts() {
  const res = await fetch("http://localhost:3000/api/user"
    
  );
  const userId = await res.json();
  return userId;
}

async function Profile() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userIds } = auth();
  if (userIds) {
    // Query DB for user specific information or display assets only to logged in users
  }
  // Get the User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements
  const userId = await loadPOsts();

  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // const formattedDate = new Date(userId.createdAt).toLocaleDateString(
  //   "es-ES",
  //   options
  // );
  return (
    <div className="Container">
      {userId && (
        <section
          key={userId.id}
          className="m-2 grid w-fit border-2 border-slate-950 dark:border-slate-300 p-2"
        >
          <section className="flex justify-center items-center p-2">
            <img
              src={user.imageUrl}
              alt={userId.firstName}
              width={800}
              className="w-36 rounded-full"
            />
          </section>
          <section className="grid grid-cols-2">
            <h1 className="text-right mx-2">Name:</h1>
            <h2 className=" text-left">
              {userId.firstName} {userId.lastName}{" "}
            </h2>
          </section>
          <section className=" grid grid-cols-2">
            <h1 className="text-right mx-2">Email:</h1>{" "}
            <h2 className=" text-left">{userId.email} </h2>
          </section>
          <section className="grid grid-cols-2">
            <h1 className="text-right mx-2">Number Phone:</h1>
            <h2 className="text-left">{userId.phone} </h2>
          </section>
          <section className="text-center font-bold">
            <h1>{userId.admin ? "You are admin" : "You are not admin"}</h1>
          </section>
          {/*
          <section className="grid grid-cols-2">
            <h1 className="text-right mx-2">Register Date:</h1>
            <h2 className=" text-left">{formattedDate}</h2>
            </section>
      */}

        </section>
      )}
    </div>
  );
}

export default Profile;

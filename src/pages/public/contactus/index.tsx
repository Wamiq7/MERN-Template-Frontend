export default function index() {
  return (
    <div className="flex h-[calc(100dvh-65.1px)] items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full rounded-md border border-input px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-input px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Enter your message"
              className="w-full rounded-md border border-input px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

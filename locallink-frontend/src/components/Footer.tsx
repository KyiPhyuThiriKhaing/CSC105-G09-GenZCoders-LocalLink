function Footer() {
  return (
    <footer className="bg-[#1e1252] text-white">
      <div className="mx-auto max-w-6xl px-6 py-7 sm:px-10 lg:px-14">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div>
            <p className="text-sm font-bold tracking-tight">LocalLink</p>
            <p className="mt-0.5 text-xs text-white/40">Connecting communities through local work</p>
          </div>
          <p className="text-xs text-white/35">&copy; 2026 Local Link. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
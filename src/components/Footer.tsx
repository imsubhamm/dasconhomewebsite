export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-mist">
      <div className="section-pad mx-auto flex max-w-7xl flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-ink">
            Dascon Sourav Commercial
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-steel">
            Dascon Sourav Commercial Pvt. Ltd. · Construction service provider ·
            Kolkata, West Bengal
          </p>
        </div>
        <div className="text-sm text-steel md:text-right">
          <p>CIN U51909WB2008PTC124583</p>
          <p className="mt-1">GSTIN 19AALCS8129G1ZW · IEC 0215018711</p>
          <p className="mt-1">© {year} Dascon Sourav Commercial Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  )
}

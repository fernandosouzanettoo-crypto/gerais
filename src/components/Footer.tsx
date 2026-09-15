export default function Footer() {
  return (
    <footer className="border-t border-line bg-black py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-sm font-bold text-foreground">
          TEMP <span className="text-hot">BOX</span>
        </p>
        <p>© {new Date().getFullYear()} TEMP BOX. Todos os direitos reservados.</p>
        <p>Especificações em desenvolvimento. Imagens meramente ilustrativas.</p>
      </div>
    </footer>
  );
}

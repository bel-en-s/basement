//esto me lo recomendo hacer la ia por si quisiese hacer esto editable desde sanity, pero no me dio el tiempo. No se si lo ideal
//seria tener todos los textos modularizados. 
//puse dos textos para que se vean los cortes exactos

export default function HeroTitle() {
  // Base delay + stagger
  const getDelay = (index: number) => ({ animationDelay: `${0.2 + index * 0.1}s` });

  return (
    <h1 className="h-hero">


      <div className="hidden md:block">
        <span className="block">
          <span className="line-inner block animate-hero-reveal" style={getDelay(0)}>
            Research, insights, and the
          </span>
        </span>
        <span className="block">
          <span className="line-inner block animate-hero-reveal" style={getDelay(1)}>
            science behind building brands
          </span>
        </span>
        <span className="block">
          <span className="line-inner block animate-hero-reveal" style={getDelay(2)}>
            & websites.
          </span>
        </span>
      </div>

      <div className="block md:hidden leading-[0.9] tracking-tighter">
        <span className="block pb-0.5">
          <span className="line-inner block animate-hero-reveal" style={getDelay(0)}>
            Research, insights,
          </span>
        </span>
        <span className="block pb-[2px]">
          <span className="line-inner block animate-hero-reveal" style={getDelay(1)}>
            and the science
          </span>
        </span>
        <span className="block pb-0.5">
          <span className="line-inner block animate-hero-reveal" style={getDelay(2)}>
            behind building
          </span>
        </span>
        <span className="block pb-0.5">
          <span className="line-inner block animate-hero-reveal" style={getDelay(3)}>
            brands & websites.
          </span>
        </span>
      </div>

    </h1>
  );
}
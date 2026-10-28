"use client";
import Image from "next/image";
import Link from "next/link";
import mainIMage from "../../public/received_2336663563385700.jpeg";
import Repository from "../../public/Repository.png";
import Gender from "../../public/Gender.png";
import Yamanote from "../../public/Yamanote.png";
import { useEffect, useRef } from "react";
// lenis
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
// lenis

// gsap imports
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
// gsap

//register them plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

export default function Home() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const lenis = useLenis();
  const IntroReveal = useRef<HTMLDivElement>(null);
  const timer = useRef<HTMLSpanElement>(null);

  const timerCounterValue = useRef<{ value: number }>({ value: 0 });
  const lineBar = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (!lenis) return;
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      lenis.stop();

      CustomEase.create("textSnap", "0.7, 0, 0.2, 1");
      //intro split texts
      const introTitle = new SplitText(".introTitle", { type: "words" });
      const introTitle1 = introTitle.words;
      gsap.set(".introTitle", { opacity: 1 });
      const IntroTL = gsap.timeline({
        onComplete: () => {
          lenisRef.current?.lenis?.start();
        },
      });
      IntroTL.to(timerCounterValue.current, {
        value: 100,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          if (timer.current) {
            timer.current.textContent = String(
              Math.floor(timerCounterValue.current.value),
            );
          }
        },
      })
        .from(
          introTitle1,
          {
            y: "300",
            stagger: 0.06,
            opacity: 1,
            duration: 1,
            ease: "textSnap",
          },
          "<",
        )
        .to({}, { duration: 1 })
        .to(IntroReveal.current, {
          ease: "power4.out",
          clipPath: "polygon(0% 0%, 101% 0%, 101% 0%, 0% 0%)",
          duration: 2,
        });

      // line animation
      gsap.fromTo(
        lineBar.current,
        { yPercent: -100 },
        { yPercent: 100, duration: 1.5, ease: "power2.inOut", repeat: -1 },
      );
    },

    { dependencies: [lenis] },
  );
  return (
    <>
      <ReactLenis
        root
        options={{
          autoRaf: false,
          duration: 3,
          smoothWheel: true,
        }}
        ref={lenisRef}
      >
        <main className="text-black font-urbanist">
          <section className="relative">
            <div
              ref={IntroReveal}
              className="absolute inset-0 flex flex-col justify-between h-screen text-white bg-[#3b3232] text-5xl lg:text-6xl px-[5vw] pt-[15vh] lg:pt-[30vh] pb-20 lg:pb-10 [clip-path:polygon(0%_0%,101%_0%,101%_101%,0%_101%)] z-20"
            >
              <h1 className="introTitle overflow-hidden py-5 opacity-0">
                Webpages are Canvases <br /> waiting to be Painted
              </h1>
              <span ref={timer} className="text-end">
                0
              </span>
            </div>
            <div className="h-screen bg-white text-black text-3xl flex flex-col lg:flex-row px-[5vw] py-[5vh] lg:p-0 gap-5 lg:gap-0">
              <div className="lg:w-[30vw] h-[30vh] lg:h-screen shrink-0 relative rounded-2xl lg:rounded-none">
                <Image
                  src={mainIMage}
                  alt="mainImage"
                  fill={true}
                  loading="eager"
                  className="object-cover z-10"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
              </div>
              <div className="flex px-[5vw] self-center">
                <div className="flex flex-col gap-y-10 min-w-0 font-light text-xl lg:text-3xl">
                  <h1 className="text-5xl lg:text-7xl font-semibold">
                    Who am I
                  </h1>
                  <p>
                    Mark Llorca, a UI/UX Designer and Front-End Developer from
                    Sorsogon, Philippines
                  </p>
                  <p>
                    Following Swiss Design Principles, I strive that Art and
                    Design significantly contributes to user experience and how
                    they interact with products or applications
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="min-h-dvh lg:h-[150vh] flex flex-col lg:flex-row bg-white lg:pt-[10vh]">
            <div className="h-full border-r border-r-[#3b3232]">
              <div className="bg-[#3b3232] w-fit lg:text-4xl px-5 lg:py-3 [writing-mode:vertical-rl] flex items-center gap-3 self-start text-white tracking-[0.2em]">
                <h1>PROJECTS</h1>
                <div className="overflow-hidden relative h-20 w-0.5 self-center ">
                  <span
                    ref={lineBar}
                    className="absolute left-0 top-0 h-full w-full bg-white"
                  ></span>
                </div>
              </div>
            </div>
            <div className="flex flex-1 py-[15vh] lg:pl-[5vw] lg:pr-[2.5vw] px-[5vw] border-y border-y-[#3b3232] lg:border-none">
              <div className="font-nanum-myeongjo flex-1 text-5xl lg:text-8xl flex flex-col lg:justify-between select-none gap-15 lg:gap-0">
                <div className="flex flex-col lg:flex-row justify-between items-start group gap-8 lg:gap-0">
                  <Link
                    href="https://www.sorsu-repository.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h1 className="underline lg:decoration-transparent decoration-2 underline-offset-[0.10em] transition-colors duration-300 hover:decoration-current self-start">
                      Repository
                    </h1>
                  </Link>
                  <div className="lg:relative z-20 w-full lg:w-[40vw] lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ease-out duration-300 text-base pointer-events-none group-hover:pointer-events-auto">
                    <div className="h-auto min-h-[30vh] lg:h-[70vh] w-full lg:absolute z-10 top-0 flex flex-col">
                      <div className="relative w-full aspect-1366/651">
                        <Image
                          src={Repository}
                          alt="Repository"
                          fill={true}
                          loading="eager"
                          className="object-cover z-10"
                          sizes="(min-width: 1024px) 65vw, 100vw"
                        />
                      </div>
                      <div className="bg-[#800000] flex-1 p-4 font-urbanist flex flex-col gap-5 text-white">
                        <h1 className="text-xl lg:text-2xl">
                          Sorsogon State University <br /> Institutional
                          Repository
                        </h1>
                        <div className=" flex flex-1 items-end justify-between text-xs lg:text-sm font-extralight">
                          <div className="flex flex-col lg:gap-1 justify-end h-full">
                            <h1>Educational</h1>
                            <h1>Web Design & Flow</h1>
                            <h1>Front-End Dev</h1>
                          </div>
                          <p className="w-[45vw] lg:w-[14vw] leading-none">
                            Dissemination, Preservation and Management of
                            Scholarly work for SorSU
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row group items-start gap-8 lg:gap-0">
                  <Link
                    href="https://gender-society-midterm.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h1 className="underline lg:decoration-transparent decoration-2 underline-offset-[0.10em] transition-colors duration-300 hover:decoration-current self-start">
                      Masculinity
                    </h1>
                  </Link>
                  <div className="lg:relative z-20 w-full lg:w-[40vw] lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ease-out duration-300 text-base pointer-events-none group-hover:pointer-events-auto">
                    <div className="h-auto min-h-[30vh] lg:h-[70vh] w-full lg:absolute z-10 flex flex-col inset-0 m-auto">
                      <div className="relative w-full aspect-1365/652">
                        <Image
                          src={Gender}
                          alt="Gender"
                          fill={true}
                          loading="eager"
                          className="object-cover z-10"
                          sizes="(min-width: 1024px) 65vw, 100vw"
                        />
                      </div>
                      <div className="bg-black flex-1 p-4 font-urbanist flex flex-col gap-5 text-white">
                        <h1 className="text-2xl">Performative Masculinity</h1>
                        <div className=" flex flex-1 items-end justify-between font-extralight text-xs lg:text-sm">
                          <div className=" flex flex-col gap-1 justify-end h-full">
                            <h1>Gender & Society</h1>
                            <h1>Web Flow & Design</h1>
                            <h1>Front-End Dev</h1>
                          </div>
                          <p className="w-[40vw] lg:w-[14vw] leading-none">
                            Discusses how Masculinity and Gender is shaped by
                            Society, and how it affects men and women alike
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between group items-start gap-8 lg:gap-0">
                  <Link
                    href="https://yamanote-sen.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h1 className="underline lg:decoration-transparent decoration-3 underline-offset-[0.10em] transition-colors duration-300 hover:decoration-current self-start">
                      Yamanote
                    </h1>
                  </Link>
                  <div className="lg:relative z-20 w-full lg:w-[40vw] h-full lg:opacity-0 lg:group-hover:opacity-100 transition-opacity ease-out duration-300 text-base pointer-events-none group-hover:pointer-events-auto">
                    <div className="h-auto min-h-[30vh] lg:h-[70vh] w-full lg:absolute z-10 bottom-0 flex flex-col">
                      <div className="relative w-full aspect-1350/649">
                        <Image
                          src={Yamanote}
                          alt="Yamanote"
                          fill={true}
                          loading="eager"
                          className="object-cover z-10"
                          sizes="(min-width: 1024px) 65vw, 100vw"
                        />
                      </div>
                      <div className="bg-[#9acd32] flex-1 p-4 font-urbanist flex flex-col gap-5 text-white">
                        <h1 className="text-2xl ">Yamanote Outer Loop</h1>
                        <div className="flex flex-1 items-end justify-between font-extralight text-xs lg:text-sm ">
                          <div className="flex flex-col gap-1 justify-end h-full ">
                            <h1>Personal / Tourism</h1>
                            <h1>Web Design & Flow</h1>
                            <h1>Front-End Dev</h1>
                          </div>
                          <p className="w-[40vw] lg:w-[14vw] leading-none">
                            Popular Stations in Yamanote Line, First Attempt in
                            Design and Front-End Dev
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="h-screen flex px-10 pt-10 lg:py-20 bg-white">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="flex-1 flex flex-col">
                <div className=" text-6xl lg:text-9xl">
                  <h1>TALK</h1> <h1> THROUGH</h1>
                </div>
                <div className="flex lg:justify-center lg:items-center text-lg lg:text-2xl lg:pl-40 pt-10 lg:pt-0">
                  <div className="grid grid-cols-[4rem_1fr] gap-y-5">
                    <div className="group contents">
                      <div className="pointer-events-none flex items-center justify-center">
                        <svg
                          width="38"
                          height="23"
                          viewBox="0 0 38 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          <path
                            d="M1.5 9.5459C0.671573 9.5459 0 10.2175 0 11.0459C0 11.8743 0.671573 12.5459 1.5 12.5459L1.5 11.0459L1.5 9.5459ZM1.5 11.0459L1.5 12.5459L36.5 12.5459V11.0459V9.5459L1.5 9.5459L1.5 11.0459ZM37.5607 12.1066C38.1464 11.5208 38.1464 10.571 37.5607 9.98524L28.0147 0.439297C27.4289 -0.14649 26.4792 -0.14649 25.8934 0.439297C25.3076 1.02508 25.3076 1.97483 25.8934 2.56062L34.3787 11.0459L25.8934 19.5312C25.3076 20.117 25.3076 21.0667 25.8934 21.6525C26.4792 22.2383 27.4289 22.2383 28.0147 21.6525L37.5607 12.1066Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="justify-self-start">
                        <Link
                          href="https://discord.com/users/748946609546723380"
                          className="focus:outline-none"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h1 className="underline lg:decoration-transparent decoration-1 underline-offset-[0.10em] transition-colors duration-300 hover:bg-black hover:text-white hover:decoration-white ">
                            Discord
                          </h1>
                        </Link>
                      </div>
                    </div>
                    <div className="group contents">
                      <div className="pointer-events-none flex items-center justify-center">
                        <svg
                          width="38"
                          height="23"
                          viewBox="0 0 38 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          <path
                            d="M1.5 9.5459C0.671573 9.5459 0 10.2175 0 11.0459C0 11.8743 0.671573 12.5459 1.5 12.5459L1.5 11.0459L1.5 9.5459ZM1.5 11.0459L1.5 12.5459L36.5 12.5459V11.0459V9.5459L1.5 9.5459L1.5 11.0459ZM37.5607 12.1066C38.1464 11.5208 38.1464 10.571 37.5607 9.98524L28.0147 0.439297C27.4289 -0.14649 26.4792 -0.14649 25.8934 0.439297C25.3076 1.02508 25.3076 1.97483 25.8934 2.56062L34.3787 11.0459L25.8934 19.5312C25.3076 20.117 25.3076 21.0667 25.8934 21.6525C26.4792 22.2383 27.4289 22.2383 28.0147 21.6525L37.5607 12.1066Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="justify-self-start">
                        <Link
                          href="https://www.facebook.com/ai.ohto.3323457"
                          className="focus:outline-none"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h1 className="underline lg:decoration-transparent decoration-1 underline-offset-[0.10em] transition-colors duration-300 hover:bg-black hover:text-white hover:decoration-white ">
                            Facebook
                          </h1>
                        </Link>
                      </div>
                    </div>
                    <div className="group contents">
                      <div className="pointer-events-none flex items-center justify-center">
                        <svg
                          width="38"
                          height="23"
                          viewBox="0 0 38 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          <path
                            d="M1.5 9.5459C0.671573 9.5459 0 10.2175 0 11.0459C0 11.8743 0.671573 12.5459 1.5 12.5459L1.5 11.0459L1.5 9.5459ZM1.5 11.0459L1.5 12.5459L36.5 12.5459V11.0459V9.5459L1.5 9.5459L1.5 11.0459ZM37.5607 12.1066C38.1464 11.5208 38.1464 10.571 37.5607 9.98524L28.0147 0.439297C27.4289 -0.14649 26.4792 -0.14649 25.8934 0.439297C25.3076 1.02508 25.3076 1.97483 25.8934 2.56062L34.3787 11.0459L25.8934 19.5312C25.3076 20.117 25.3076 21.0667 25.8934 21.6525C26.4792 22.2383 27.4289 22.2383 28.0147 21.6525L37.5607 12.1066Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="justify-self-start">
                        <h1>llorcamark00@gmail.com</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-start [writing-mode:vertical-rl]">
              <h1>Mark Llorca</h1>
            </div>
          </section>
        </main>
      </ReactLenis>
    </>
  );
}

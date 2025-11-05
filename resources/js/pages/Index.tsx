import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { motion } from "motion/react";
import { useRef } from "react";

interface Logo {
    id: number;
    name: string;
    logo_path: string;
    display_order: number;
}

interface IndexPageSetting {
    id: number;
    title_text: string;
    hero_image: string;
    button_text: string;
    button_link: string;
    active_logos: Logo[];
}

interface Props {
    indexPage?: IndexPageSetting;
}

const DEFAULT_LOGOS = [
    { id: 1, name: "ICT Olympiad", logo_path: "/assets/ict-olympiad-bangladesh.png", display_order: 1 },
    { id: 2, name: "Nexfly", logo_path: "/assets/nex-fly.png", display_order: 2 },
    { id: 3, name: "Mechanix", logo_path: "/assets/mechanix.png", display_order: 3 },
    { id: 4, name: "NexAcademy", logo_path: "/assets/nex-academy.png", display_order: 4 },
    { id: 5, name: "MindShopper", logo_path: "/assets/mindshaper.png", display_order: 5 },
    { id: 6, name: "NEX Real Estate", logo_path: "/assets/nex-real-estate.png", display_order: 6 },
    { id: 7, name: "NexSports", logo_path: "/assets/nex-sports.png", display_order: 7 },
    { id: 8, name: "Brand", logo_path: "/assets/my-brand-story.png", display_order: 8 },
];

const Home = ({ indexPage }: Props) => {
    const timeoutRef = useRef<number | null>(null);
    
    const logos = indexPage?.active_logos && indexPage.active_logos.length > 0 
        ? indexPage.active_logos 
        : DEFAULT_LOGOS;
    const titleText = indexPage?.title_text || "SHAHRIAR";
    const heroImage = indexPage?.hero_image || "/assets/shahrier.png";
    const buttonText = indexPage?.button_text || "Play Now";
    const buttonLink = indexPage?.button_link || "/home";

    return (
        <div className="bg-[#0f0f0f] relative flex min-h-screen w-full items-center justify-center overflow-hidden">

            <div className="max-w-7xl absolute top-8 md:top-16 px-8 w-full z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="flex items-center justify-center p-4 rounded-lg hover:bg-muted/20 transition-colors duration-300"
                        >
                            <img src={logo.logo_path} alt={logo.name} className="w-24 h-12 object-contain" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-7xl md:text-[150px] lg:text-[200px] font-bold text-muted-foreground select-none whitespace-nowrap z-10">
                    {titleText}
                </h1>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-muted-foreground/50 to-transparent" />

            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
            />

            <motion.button onClick={() => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                    window.location.href = '/dashboard';
                } else {
                    timeoutRef.current = setTimeout(() => {
                        window.location.href = buttonLink;
                        timeoutRef.current = null;
                    }, 300) as any;
                }
            }} className="absolute bottom-4 py-4 px-8 bg-white text-black hover:bg-[#e7e7e7] hover:text-[#0f0f0f] font-semibold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl z-30">
                {buttonText}
            </motion.button>

            <img src={heroImage} alt={titleText} className="absolute bottom-0 h-[60vh] max-h-[75vh] lg:h-[750px] object-cover z-20" />

        </div>
    );
};

export default Home;
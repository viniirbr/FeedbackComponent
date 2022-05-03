import { CloseButton } from "./CloseButton";
import bugImageUrl from '../images/bug.svg'
import ideaImageUrl from '../images/idea.svg'
import thoughtImageUrl from '../images/thought.svg'

const feedbackTypes = {
    PROBLEM: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt:"Imagem de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt:"Imagem de uma lâmpada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughtImageUrl,
            alt:"Imagem de um balão de pensamento"
        }
    }
}

export function WidgetForm() {
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg 
    w-[calc(100vw-2rem)] md:w-auto">
        <header>
            <span className="text-xl leading-6">Deixe seu feedback</span>
            <CloseButton />
        </header>

        <div className="py-8 flex gap-2 w-full">
            {Object.entries(feedbackTypes).map(([key, value]) => {
                return (
                    <button
                        className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2
                        border-2 border-transparent hover:border-brand-500 
                        focus:border-brand-500 focus:outline-none"
                        key={key}>
                        <img src={value.image.source} alt={value.image.alt} />
                        <span>{value.title}</span>
                    </button>
                )
            })}
        </div>

        <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
        </footer>
    </div>
  )
}

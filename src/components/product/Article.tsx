'use client'

import { FC, useEffect, useRef, useState } from 'react'

import { products } from '@/data'
import { ImageType } from '@/types/ImageType'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CiMenuKebab } from 'react-icons/ci'
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdHeartEmpty,
} from 'react-icons/io'
import { MdOutlineModeComment } from 'react-icons/md'

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
}

type ArticleProps = {
  images: ImageType[]
}

export const Article: FC<ArticleProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 0 for initial, 1 for next, -1 for prev

  const imageRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (imageRefs.current[currentIndex]) {
      imageRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [currentIndex, imageRefs.current[currentIndex]])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    )
  }

  return (
    <div className="md:grid flex flex-col grid-cols-10 w-full">
      <div className="md:block hidden max-h-dvh overflow-scroll hidden-scrollbar col-span-1">
        <ul className="flex flex-col gap-2">
          {images.map((image, index) => (
            <li
              key={image.img.id}
              ref={(el) => {
                imageRefs.current[index] = el
              }}
              className="relative h-20 w-full"
            >
              <Image
                src={image.img.src}
                alt={`商品サムネイル${index}`}
                fill={true}
                placeholder="blur"
                blurDataURL={image.base64}
                className={`rounded object-contain bg-slate-800 w-full py-2 cursor-pointer hover:opacity-80 transition duration-300 ${
                  index === currentIndex &&
                  'border-2 border-red-500 border-solid'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4 w-full">
        <div className="relative">
          {images.length > 1 && currentIndex < images.length - 1 && (
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 bg-zinc-900 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition duration-300"
              onClick={handleNext}
            >
              <IoIosArrowForward size={32} />
            </button>
          )}
          {currentIndex > 0 && (
            <button
              type="button"
              className="absolute left-8 top-1/2 z-10 bg-zinc-900 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition duration-300"
              onClick={handlePrev}
            >
              <IoIosArrowBack size={32} />
            </button>
          )}
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="min-h-dvh w-full relative ml-4 flex items-center justify-center"
          >
            <Image
              fill={true}
              src={images[currentIndex].img.src}
              alt={`商品サムネイル${currentIndex}`}
              className="rounded object-contain bg-slate-800"
            />
          </motion.div>
          <div className="absolute bottom-5 right-2 text-white text-sm bg-zinc-900 py-1 px-2 rounded-md">
            {currentIndex + 1}/{images.length}
          </div>
        </div>
      </div>
      <div className="col-span-5 ml-8 mt-4 md:mt-0">
        <section className="mb-8">
          <div className="mb-3">
            <div className="mb-0.5 text-xl font-bold">
              <h1 className="w-full">{products[0].name}</h1>
            </div>
            {products[0].size && (
              <p className="text-zinc-500">{products[0].size}</p>
            )}
          </div>
          <section className="mb-4">
            <div className="flex flex-row items-center justify-normal">
              <div className="mr-2">
                <span className="mr-0.5 text-zinc-500">¥</span>
                <span className="text-xl">
                  {new Intl.NumberFormat('ja-JP').format(products[0].price)}
                </span>
              </div>
              <p className="text-base">
                {products[0].shippingCharges === '送料込み(出品者負担)'
                  ? '(税込)送料込み'
                  : '(税込み)着払い'}
              </p>
            </div>
          </section>
          <section className="mb-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-normal gap-2">
                <div className="inline-table items-center justify-center min-h-9 min-w-9">
                  <button
                    type="button"
                    className="min-w-16 p-1 hover:bg-zinc-200 duration-300 transition rounded-md"
                  >
                    <div className="w-full flex flex-col items-center">
                      <IoMdHeartEmpty size={24} />
                      {/* <span className="w-full ml-2 text-sm">{products[0].likes > 0 ? likes: "いいね！"}</span> */}
                      <span className="w-full ml-2 text-sm">いいね！</span>
                    </div>
                  </button>
                </div>
                <div className="inline-table items-center justify-center min-h-9 min-w-9">
                  <button
                    type="button"
                    className="min-w-16 p-1 hover:bg-zinc-200 duration-300 transition rounded-md"
                  >
                    <div className="w-full flex flex-col items-center">
                      <MdOutlineModeComment size={24} />
                      {/* <span className="w-full ml-2 text-sm">{products[0].likes > 0 ? likes: "いいね！"}</span> */}
                      <span className="w-full ml-2 text-sm">コメント</span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="box-border">
                <div className="w-full inline-flex items-center justify-center min-h-9 min-w-9">
                  <button
                    type="button"
                    className="rounded-full hover:bg-slate-200 p-1 duration-300 transition"
                  >
                    <CiMenuKebab size={24} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-normal gap-4 mt-2">
              <div className="w-full inline-flex text-base font-bold">
                <button
                  type="button"
                  disabled={products[0].isSoldOut}
                  className="w-full py-3 px-4 rounded text-white bg-red-500 hover:bg-red-700 shadow-md duration-300 transition disabled:cursor-not-allowed disabled:text-zinc-200 disabled:bg-zinc-400 disabled:hover:bg-zinc-400"
                >
                  {products[0].isSoldOut ? '売り切れました' : '購入手続きへ'}
                </button>
              </div>
            </div>
          </section>
          <section className="mb-8">
            <div className="flex items-end gap-4 mb-4 text-xl font-bold text-left text-zinc-500">
              <h2>商品の説明</h2>
            </div>
            <div className="mb-4">
              <div className="overflow-hidden max-h-[390px]">
                <pre className="text-base hyphens-auto m-0 whitespace-pre-wrap break-words">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  quod provident ut rem ipsa reiciendis voluptatem cum tenetur
                  quo, autem nostrum, repudiandae expedita repellat
                  reprehenderit nemo dignissimos officiis natus quos. Lorem
                  ipsum dolor, sit amet consectetur adipisicing elit. Velit
                  consequuntur ex nam vitae error doloremque, numquam deleniti
                  reiciendis veritatis nisi sunt architecto culpa nihil,
                  aliquam, dolorum harum perferendis repellendus excepturi!
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                  quod provident ut rem ipsa reiciendis voluptatem cum tenetur
                  quo, autem nostrum, repudiandae expedita repellat
                  reprehenderit nemo dignissimos officiis natus quos. Lorem
                  ipsum dolor, sit amet consectetur adipisicing elit. Velit
                  consequuntur ex nam vitae error doloremque, numquam deleniti
                  reiciendis veritatis nisi sunt architecto culpa nihil,
                  aliquam, dolorum harum perferendis repellendus excepturi!
                </pre>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center mt-1 bg-transparent h-9 border-none text-blue-500 hover:text-blue-700 transition duration-300"
              >
                もっと見る
                <IoIosArrowDown />
              </button>
            </div>
            <p className="text-base font-normal hyphens-auto break-words text-zinc-500">
              2時間前
            </p>
          </section>
        </section>
      </div>
    </div>
  )
}

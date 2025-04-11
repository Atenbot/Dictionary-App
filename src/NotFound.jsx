const NotFound = ( {font} ) => {
    return ( 
<div className="max-w-7xl pt-16 flex flex-col items-center bg-primary-100 dark:bg-primary-800">
    {font === 'font-inter' && <div className="mx-auto border-[1.5px] w-8 h-10 md:w-10 md:h-14 border-primary-500 dark:border-primary-100"></div>}
    {font === 'font-lora' && <div className="mx-auto border-y-[2px] border-x-[6px] w-8 h-10 border-primary-500 dark:border-primary-100"></div>}
    {font === 'font-inconsolata' && <p className="text-4xl lg:text-5xl text-primary-800 dark:text-primary-100">⍰</p>}
    <p className="pt-10 text-xl md:text-2xl lg:text-3xl font-bold text-primary-800 dark:text-primary-100">No definitions found</p>
    <p className="text-center pt-4 text-primary-400 mx-4 text-sm md:text-lg md:pt-6">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at a later time or head to the web instead</p>
</div>
     );
}
 
export default NotFound;
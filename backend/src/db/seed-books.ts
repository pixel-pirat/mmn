/**
 * Seeds the 31 books into the database.
 * Usage: npm run db:seed-books
 * Safe to run multiple times — skips books that already exist by title.
 */
import { pool } from "./pool";

const BOOKS = [
  { title: "Atomic Habits",                           author: "James Clear",           price: 65, category: "Personal Development", description: "An easy and proven way to build good habits and break bad ones.",                                    cover_color: "from-orange-500 to-red-500" },
  { title: "In Charge",                               author: "Myles Munroe",          price: 50, category: "Leadership",           description: "Discover the power of true leadership and how to take charge of your life and destiny.",              cover_color: "from-blue-600 to-indigo-700" },
  { title: "Start With Why",                          author: "Simon Sinek",           price: 55, category: "Leadership",           description: "How great leaders inspire everyone to take action by starting with purpose.",                         cover_color: "from-teal-500 to-cyan-600" },
  { title: "Unleash Purpose",                         author: "MMN",                   price: 45, category: "Purpose & Identity",   description: "A guide to discovering, developing, and living out your God-given purpose.",                          cover_color: "from-emerald-500 to-teal-600" },
  { title: "How Successful People Think",             author: "John C. Maxwell",       price: 45, category: "Personal Development", description: "Change your thinking, change your life — lessons from the world's most successful minds.",             cover_color: "from-violet-500 to-purple-600" },
  { title: "Secrets of the Millionaire Mind",         author: "T. Harv Eker",          price: 40, category: "Finance & Wealth",     description: "Mastering the inner game of wealth and reprogramming your financial blueprint.",                      cover_color: "from-amber-500 to-orange-600" },
  { title: "Maximizing Your Potential",               author: "Myles Munroe",          price: 45, category: "Purpose & Identity",   description: "Unlock the hidden you and live the life you were created to live.",                                   cover_color: "from-green-500 to-emerald-600" },
  { title: "How to Talk to Anyone",                   author: "Leil Lowndes",          price: 50, category: "Personal Development", description: "92 little tricks for big success in relationships and communication.",                                cover_color: "from-pink-500 to-rose-600" },
  { title: "Gifted Hands",                            author: "Ben Carson",            price: 40, category: "Inspiration",          description: "The remarkable story of Dr. Ben Carson — a journey from poverty to world-renowned neurosurgeon.",     cover_color: "from-cyan-500 to-blue-600" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey",      price: 65, category: "Personal Development", description: "Powerful lessons in personal change that have shaped generations of leaders.",                        cover_color: "from-indigo-500 to-violet-600" },
  { title: "The Psychology of Money",                 author: "Morgan Housel",         price: 50, category: "Finance & Wealth",     description: "Timeless lessons on wealth, greed, and happiness.",                                                  cover_color: "from-yellow-500 to-amber-600" },
  { title: "No Excuse!",                              author: "Brian Tracy",           price: 50, category: "Personal Development", description: "The power of self-discipline to achieve your goals in life.",                                        cover_color: "from-red-500 to-rose-600" },
  { title: "The Richest Man in Babylon",              author: "George S. Clason",      price: 45, category: "Finance & Wealth",     description: "Ancient wisdom on building wealth, financial success, and personal prosperity.",                     cover_color: "from-amber-400 to-yellow-500" },
  { title: "Tough Times Never Last",                  author: "Robert H. Schuller",    price: 45, category: "Inspiration",          description: "But tough people do — a message of hope and resilience for every season of life.",                   cover_color: "from-sky-500 to-blue-600" },
  { title: "The Power of Now",                        author: "Eckhart Tolle",         price: 55, category: "Spiritual Growth",     description: "A guide to spiritual enlightenment and living fully in the present moment.",                         cover_color: "from-lime-500 to-green-600" },
  { title: "Make Today Count",                        author: "John C. Maxwell",       price: 45, category: "Personal Development", description: "The secret of your success is determined by your daily agenda.",                                     cover_color: "from-fuchsia-500 to-pink-600" },
  { title: "Good Morning, Holy Spirit",               author: "Benny Hinn",            price: 40, category: "Spiritual Growth",     description: "A life-changing encounter with the person and presence of the Holy Spirit.",                         cover_color: "from-blue-400 to-sky-500" },
  { title: "Think and Grow Rich",                     author: "Napoleon Hill",         price: 50, category: "Finance & Wealth",     description: "The classic guide to achieving success through the power of thought and definite purpose.",           cover_color: "from-orange-400 to-amber-500" },
  { title: "The 15 Invaluable Laws of Growth",        author: "John C. Maxwell",       price: 60, category: "Personal Development", description: "Live them and reach your potential — timeless principles for intentional growth.",                   cover_color: "from-teal-600 to-emerald-700" },
  { title: "Things I Wish I Knew at 18",              author: "Dennis Trittin",        price: 50, category: "Purpose & Identity",   description: "Life lessons for the road ahead — practical wisdom for young adults.",                              cover_color: "from-violet-400 to-purple-500" },
  { title: "Becoming a Person of Influence",          author: "John C. Maxwell",       price: 50, category: "Leadership",           description: "How to positively impact the lives of others through authentic influence.",                          cover_color: "from-rose-500 to-red-600" },
  { title: "Think Like a Billionaire",                author: "Donald Trump",          price: 60, category: "Finance & Wealth",     description: "Everything you need to know about success, real estate, and life.",                                 cover_color: "from-yellow-400 to-orange-500" },
  { title: "Think and Grow Rich (2nd Copy)",          author: "Napoleon Hill",         price: 50, category: "Finance & Wealth",     description: "The classic guide to achieving success through the power of thought and definite purpose.",           cover_color: "from-amber-600 to-orange-700" },
  { title: "Rich Dad Poor Dad",                       author: "Robert T. Kiyosaki",    price: 45, category: "Finance & Wealth",     description: "What the rich teach their kids about money that the poor and middle class do not.",                  cover_color: "from-green-600 to-teal-700" },
  { title: "Psychology of Wealth",                    author: "Charles Richards",      price: 50, category: "Finance & Wealth",     description: "Understand your relationship with money and unlock the mindset of financial abundance.",             cover_color: "from-indigo-400 to-blue-500" },
  { title: "Success Is Not an Accident",              author: "Tommy Newberry",        price: 50, category: "Personal Development", description: "Change your choices, change your life — a blueprint for intentional success.",                       cover_color: "from-emerald-400 to-green-500" },
  { title: "Think Big",                               author: "Ben Carson",            price: 40, category: "Inspiration",          description: "Unleashing your potential for excellence — a call to dream bigger and act bolder.",                  cover_color: "from-sky-400 to-cyan-500" },
  { title: "Understanding Your Potential",            author: "Myles Munroe",          price: 45, category: "Purpose & Identity",   description: "Discovering the hidden you — a powerful exploration of your God-given gifts.",                       cover_color: "from-purple-500 to-violet-600" },
  { title: "Talent Is Never Enough",                  author: "John C. Maxwell",       price: 60, category: "Leadership",           description: "Discover the choices that will take you beyond your talent.",                                        cover_color: "from-red-400 to-rose-500" },
  { title: "Think for Yourself",                      author: "Vikram Mansharamani",   price: 45, category: "Personal Development", description: "Restoring common sense in an age of experts and artificial intelligence.",                           cover_color: "from-cyan-600 to-teal-700" },
  { title: "Cashflow Quadrant",                       author: "Robert T. Kiyosaki",    price: 50, category: "Finance & Wealth",     description: "Rich dad's guide to financial freedom — understanding the four ways people earn money.",             cover_color: "from-lime-600 to-green-700" },
];

async function seedBooks() {
  const client = await pool.connect();
  let inserted = 0;
  let skipped = 0;

  try {
    for (const book of BOOKS) {
      const existing = await client.query("SELECT id FROM books WHERE title = $1", [book.title]);
      if (existing.rowCount && existing.rowCount > 0) {
        skipped++;
        continue;
      }
      await client.query(
        `INSERT INTO books (title, author, price, category, description, cover_color, in_stock)
         VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
        [book.title, book.author, book.price, book.category, book.description, book.cover_color]
      );
      inserted++;
    }
    console.log(`[seed-books] ✓ Inserted ${inserted} books, skipped ${skipped} (already exist).`);
  } finally {
    client.release();
    await pool.end();
  }
}

seedBooks().catch(err => {
  console.error("[seed-books] ✗ Failed:", err.message);
  process.exit(1);
});

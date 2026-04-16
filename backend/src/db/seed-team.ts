/**
 * Seeds the team_members table with the current executives and board.
 * Usage: npm run db:seed-team
 * Safe to run multiple times — skips existing members by name.
 */
import { pool } from "./pool";

const BOARD = [
  { name: "Joseph Zah-Nyatefe", title: "President", bio: "Visionary leader steering MMN's mission of helping individuals discover their purpose and live with lasting impact.", expertise: "Leadership & Strategy", email: "zahnyatefe@gmail.com", category: "board", display_order: 1 },
  { name: "Joan Agyei-Kumah", title: "Vice President", bio: "Dedicated to advancing MMN's programs and supporting the president in driving the organisation's vision forward.", expertise: "Program Oversight", email: "joanagyeikumah@gmail.com", category: "board", display_order: 2 },
  { name: "Bless Dzikunu", title: "Secretary", bio: "Ensures smooth organisational operations, record-keeping, and effective communication across all teams.", expertise: "Administration", email: "blessdzikunu123@gmail.com", category: "board", display_order: 3 },
  { name: "Emmanuel K. Amenyo", title: "Executive Director", bio: "Drives MMN's operational strategy and program delivery as the organisation's chief executive.", expertise: "Executive Leadership", email: "amenyoemmanuel04@gmail.com", facebook: "https://www.facebook.com/smart.kinggh.31?mibextid=rS40aB7S9Ucbxw6v", category: "board", display_order: 4 },
  { name: "Sheena Agbeamehia", title: "Treasurer", bio: "Manages MMN's finances with transparency and accountability, ensuring resources are directed toward maximum impact.", expertise: "Financial Management", email: "sheenagbeamehia@gmail.com", category: "board", display_order: 5 },
];

const EXECUTIVE = [
  { name: "Sandra Ayinsogya", title: "Administrative Officer", bio: "Keeps MMN's operations running smoothly through efficient administration and organisational support.", expertise: "Administration", email: "sandra0538346164@gmail.com", category: "executive", display_order: 1 },
  { name: "Lois Naamah", title: "Financial Secretary", bio: "Oversees MMN's financial records, budgeting, and reporting with diligence and integrity.", expertise: "Finance", email: "naamahlois@gmail.com", linkedin: "https://www.linkedin.com/in/naamah-lois-lartey-692077363", category: "executive", display_order: 2 },
  { name: "Judith Gamasen", title: "Membership & Welfare Director", bio: "Champions member welfare and drives community building, ensuring every MMN member feels valued and supported.", expertise: "Member Welfare & Community", email: "judithgamasen323@gmail.com", linkedin: "https://www.linkedin.com/in/judith-gamasen-482709332", category: "executive", display_order: 3 },
  { name: "Zerez Teye Gormey", title: "Programs Coordinator", bio: "Designs and coordinates MMN's workshops, seminars, and purpose-driven development initiatives.", expertise: "Program Development", email: "zerezteyegormey@gmail.com", category: "executive", display_order: 4 },
];

async function seedTeam() {
  const client = await pool.connect();
  let inserted = 0;
  let skipped = 0;

  try {
    for (const member of [...BOARD, ...EXECUTIVE]) {
      const existing = await client.query("SELECT id FROM team_members WHERE name = $1", [member.name]);
      if (existing.rowCount && existing.rowCount > 0) {
        skipped++;
        continue;
      }
      await client.query(
        `INSERT INTO team_members (name, title, bio, expertise, email, linkedin, facebook, category, display_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [member.name, member.title, member.bio, member.expertise, member.email, (member as any).linkedin ?? null, (member as any).facebook ?? null, member.category, member.display_order]
      );
      inserted++;
    }
    console.log(`[seed-team] ✓ Inserted ${inserted} team members, skipped ${skipped} (already exist).`);
  } finally {
    client.release();
    await pool.end();
  }
}

seedTeam().catch(err => {
  console.error("[seed-team] ✗ Failed:", err.message);
  process.exit(1);
});

import styles from '../../css/MenuItem.module.css';

// icons
import { IoIosArrowForward } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";

function MenuItem({ icon, iconColor, title, desc, onClick, arrow, link }) {
	return (
		<li>
			<button
				className={styles.menuItem}
				onClick={onClick}
			>
				<div style={{ color: iconColor }}>
					{icon}
				</div>

				<div className={styles.textWrapper}>
					<h3 className={styles.title}>
						{title}
					</h3>

					<small className={styles.desc}>
						{desc}
					</small>
				</div>

				{arrow && (
					<IoIosArrowForward />
				)}

				{link && (
					<LuExternalLink />
				)}
			</button>
		</li>
	)
}

export default MenuItem;
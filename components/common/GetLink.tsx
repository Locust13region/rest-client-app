import Link from '@mui/material/Link';
import NextLink from 'next/link';

interface IGetLink {
  link: string;
  name: string;
}

function GetLink({ link, name }: IGetLink) {
  return (
    <Link
      component={NextLink}
      variant="body2"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textDecoration: 'none',
        fontSize: { xs: '0.9rem', sm: '1rem' },
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {name}
    </Link>
  );
}

export default GetLink;

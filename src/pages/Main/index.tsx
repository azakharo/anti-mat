import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useCallback,
  useState,
} from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {containsMat} from 'src/services/antimat';

interface TextExample {
  text: string;
  hasMat: boolean;
  suspiciousWords: string[];
}

const Main = () => {
  const [input, setInput] = useState('');
  const [texts, setTexts] = useState<TextExample[]>([]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    evt => setInput(evt.target.value),
    [setInput],
  );

  const handleSubmit: FormEventHandler = evt => {
    evt.preventDefault();

    const [status, suspiciousWords] = containsMat(input);

    setTexts(prevTexts => [
      ...prevTexts,
      {text: input, hasMat: status, suspiciousWords},
    ]);
    setInput('');
  };

  return (
    <Container maxWidth="lg">
      <Box my={2}>
        <Typography variant="h5">
          Проверка текста на нецензурную лексику
        </Typography>

        <Stack spacing={1} mt={2}>
          {texts.map(({text, hasMat, suspiciousWords}, index) => (
            <Box
              py={1}
              borderRadius={2}
              display="flex"
              alignItems="center"
              gap={1}
              key={`${index}_${text}`}
            >
              {hasMat ? (
                <ErrorOutlineOutlinedIcon sx={{fill: 'lightcoral'}} />
              ) : (
                <CheckCircleOutlineOutlinedIcon sx={{fill: 'lightgreen'}} />
              )}

              <Typography variant="body1">{text}</Typography>

              {hasMat && (
                <>
                  <Typography variant="body2" color="lightcoral">
                    Подозрительные слова:{' '}
                    {suspiciousWords.map(w => `"${w}"`).join(', ')}
                  </Typography>
                </>
              )}
            </Box>
          ))}
        </Stack>

        <Box mt={2}>
          <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                value={input}
                onChange={handleInputChange}
                size="small"
                placeholder="Введите текст, нажмите Enter"
                sx={{minWidth: '80ch'}}
                autoFocus
              />
              <Button type="submit" variant="contained">
                OK
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(Main);

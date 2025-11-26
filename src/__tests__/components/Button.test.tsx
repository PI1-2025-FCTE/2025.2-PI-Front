import Button from '@/app/components/Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button component', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Clique aqui</Button>);
    
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('chama a função onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    const button = screen.getByText('Clique');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

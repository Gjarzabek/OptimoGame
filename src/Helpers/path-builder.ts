export class PathBuilder {

    public static character(name: string, animation: string, idx: number): string {
        return `/Character/${name}/${animation}_${idx}.png`
    }

    public static food(idx: number): string {
        return `/Food/${idx}.png`
    }

}